import React, { useState, useEffect } from 'react';
import FolderStructure from '../../base/FolderStructure/FolderStructure';
import { Node, PackageJson } from '../../utlis/Interfaces/Interface';
import { addNpmPackage, handleAddDirectory, handleDeleteDirectory, handleDeletePackage, fetchStructureProject, searchNpmPackages, handleSaveStructureProject } from '../../utlis/common/common.utils';

const Vite: React.FC = () => {
    const [structure, setStructure] = useState<Node | null>(null);
    const [packageJson, setPackageJson] = useState<PackageJson[]>([]);
    const [npmPackages, setNpmPackages] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [, setSelectedPackage] = useState<string>('');
    const [projectName, setProjectName] = useState<string>('my-vite-app');
    const [framework, setFramework] = useState<string>('vanilla');
    const [language, setLanguage] = useState<string>('javascript');

    const fetchStructure = async () => {
        const finalFramework = language === 'typescript' ? `${framework}-ts` : framework;
        fetchStructureProject('http://localhost:3003/vite-app/fetch-structure', {
            appName: projectName,
            framework: finalFramework,
        }, setStructure);
    };

    const handleSaveStructure = async () => {
        const finalFramework = language === 'typescript' ? `${framework}-ts` : framework;
        handleSaveStructureProject('http://localhost:3003/vite-app/create', {
            structure: structure,
            packageJson: packageJson,
            appName: projectName,
            framework: finalFramework,
        }, projectName);
    };

    useEffect(() => {
        fetchStructure();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchNpmPackages(searchQuery, setNpmPackages);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className="bg-[#1e1e1e] pt-12 px-4 md:px-8 overflow-x-hidden min-h-screen">
            <h1 className="text-white text-xl mb-4">Folder Structure</h1>
            <div className="mb-6 flex flex-col md:flex-row items-start md:items-center">
                <label className="text-white mb-2 md:mb-0">
                    Project Name:
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="mx-2 px-2 py-1 text-black rounded-md mt-2 md:mt-0 w-full md:w-auto"
                    />
                </label>
                <label className="text-white mb-2 md:mb-0 md:ml-4">
                    Framework:
                    <select
                        value={framework}
                        onChange={(e) => setFramework(e.target.value)}
                        className="mx-2 px-2 py-1 text-black rounded-md mt-2 md:mt-0 w-full md:w-auto"
                    >
                        <option value="vanilla">Vanilla</option>
                        <option value="vue">Vue</option>
                        <option value="react-swc">React SWC</option>
                        <option value="preact">Preact</option>
                        <option value="lit">Lit</option>
                        <option value="svelte">Svelte</option>
                        <option value="solid">Solid</option>
                        <option value="qwik">Qwik</option>
                    </select>
                </label>
                <label className="text-white mb-2 md:mb-0 md:ml-4">
                    Language:
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="ml-2 px-2 py-1 text-black rounded-md mt-2 md:mt-0 w-full md:w-auto"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                    </select>
                </label>
                <button
                    onClick={fetchStructure}
                    className="mt-4 md:mt-0 ml-0 md:ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap w-full md:w-auto"
                >
                    Fetch Structure
                </button>
            </div>
            {structure ? (
                <>
                    <FolderStructure
                        structure={structure}
                        onAddDirectory={(node) => handleAddDirectory(node, setStructure)}
                        onDeleteDirectory={(node) => handleDeleteDirectory(node, setStructure)}
                    />
                    <div className="mt-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <input
                                type="text"
                                placeholder="Search NPM packages"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-72 px-2 py-1 rounded-md mb-4 md:mb-0"
                            />
                            <select
                                onChange={(e) => addNpmPackage(e.target.value, setPackageJson, setSelectedPackage)}
                                className="w-full md:w-72 px-2 py-1 rounded-md"
                            >
                                <option value="">Select NPM Package</option>
                                {npmPackages.map(pkg => (
                                    <option key={pkg} value={pkg}>{pkg}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-white text-lg mb-2">Added Packages:</h3>
                        <div className="flex flex-wrap gap-2">
                            {packageJson.map(pkg => (
                                <div key={pkg.name} className="flex items-center bg-gray-700 text-white rounded-md px-3 py-2">
                                    <span>{pkg.name} ({pkg.version})</span>
                                    <button
                                        onClick={() => handleDeletePackage(pkg.name, setPackageJson)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleSaveStructure}
                        className="mt-6 ml-0 md:ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full md:w-auto"
                    >
                        Save Structure
                    </button>
                </>
            ) : (
                <p className="text-white">Loading...</p>
            )}
        </div>

    );

}

export default Vite