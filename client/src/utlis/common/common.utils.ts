import axios from 'axios';
import { Node, PackageJson } from '../Interfaces/Interface';

export const addNpmPackage = async (
    packageName: string,
    setPackageJson: React.Dispatch<React.SetStateAction<PackageJson[]>>,
    setSelectedPackage: React.Dispatch<React.SetStateAction<string>>
) => {
    if (!packageName) return;

    try {
        const response = await axios.get(`https://registry.npmjs.org/${packageName}/latest`);
        const { name, version } = response.data;
        setPackageJson(prevState => [
            ...prevState,
            { name, version },
        ]);
        setSelectedPackage('');
    } catch (error) {
        console.error('Failed to fetch package details', error);
    }
};

export const handleDeletePackage = (
    packageName: string,
    setPackageJson: React.Dispatch<React.SetStateAction<PackageJson[]>>
) => {
    setPackageJson(prevState =>
        prevState.filter(pkg => pkg.name !== packageName)
    );
};

export const handleAddDirectory = (
    parentNode: Node,
    setStructure: React.Dispatch<React.SetStateAction<Node | null>>
) => {
    const directoryName = prompt('Enter the name of the new directory:', 'New Folder');

    if (!directoryName) return;

    const newDirectory: Node = {
        name: directoryName,
        type: 'directory',
        children: [],
        deletable: true,
        id: directoryName + Date.now(),
    };

    const addNode = (node: Node): Node => {
        if (node === parentNode) {
            return {
                ...node,
                children: [...(node.children || []), newDirectory],
            };
        } else if (node.children) {
            return {
                ...node,
                children: node.children.map(addNode),
            };
        }
        return node;
    };

    setStructure(prevStructure => (prevStructure ? addNode(prevStructure) : null));
};

export const handleDeleteDirectory = (
    nodeToDelete: Node,
    setStructure: React.Dispatch<React.SetStateAction<Node | null>>
) => {
    const deleteNode = (node: Node): Node | null => {
        if (node === nodeToDelete) {
            return null;
        } else if (node.children) {
            return {
                ...node,
                children: node.children
                    .map(deleteNode)
                    .filter((child): child is Node => child !== null),
            };
        }
        return node;
    };

    setStructure(prevStructure => prevStructure ? deleteNode(prevStructure) : null);
};

export const fetchStructureProject = async (
    url: string,
    body: object,
    setStructure: React.Dispatch<React.SetStateAction<Node | null>>
) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the structure');
        }

        const data = await response.json();
        setStructure(data);
    } catch (error) {
        console.error('Error fetching structure:', error);
        setStructure({ name: 'root', type: 'directory', children: [] });
    }
};

export const handleSaveStructureProject = async (
    url: string,
    body: object,
    projectName: string
) => {
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', `${projectName}.zip`);
                document.body.appendChild(link);
                link.click();
                link?.parentNode?.removeChild(link);
            })
            .catch(error => {
                console.error('There was an error with the fetch operation:', error);
            });
    } catch (error) {
        console.error('Error saving structure:', error);
        alert('Error saving structure.');
    }
};

export const searchNpmPackages = async (
    query: string,
    setNpmPackages: React.Dispatch<React.SetStateAction<string[]>>
) => {
    if (!query) {
        setNpmPackages([]);
        return;
    }

    try {
        const response = await axios.get(`https://api.npms.io/v2/search/suggestions?q=${query}`);
        const packages = response.data.map((pkg: any) => pkg.package.name);
        setNpmPackages(packages);
    } catch (error) {
        console.error('Error searching npm packages:', error);
        setNpmPackages([]);
    }
};
