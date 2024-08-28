export interface Service {
    icon: JSX.Element;
    name: string; 
}

export interface FrameWork {
    name: string;
    link: string;
    description: string;
    image: string;
    alt: string;
    services: Service[];
}

export interface CustomCardProps {
    frameWork: FrameWork;
}


export interface Node {
    name: string;
    type: 'directory' | 'file';
    children?: Node[];
    deletable?: boolean;
    id?: string | null;
}

export interface FolderStructureProps {
    structure: Node;
    onAddDirectory: (node: Node) => void;
    onDeleteDirectory: (node: Node) => void;
}

export interface PackageJson {
    name: string;
    version: string;
}
