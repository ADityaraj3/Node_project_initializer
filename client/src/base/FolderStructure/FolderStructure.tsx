import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaChevronRight, FaRegFile } from 'react-icons/fa';
import { FolderStructureProps, Node } from '../../utlis/Interfaces/Interface';

const FolderStructure: React.FC<FolderStructureProps> = ({
  structure,
  onAddDirectory,
  onDeleteDirectory,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({});

  const initializeExpandedNodes = (node: Node) => {
    let initialState: { [key: string]: boolean } = {};
    if (node.type === 'directory') {
      initialState[node.id] = true;
      if (node.children) {
        node.children.forEach((child) => {
          initialState = { ...initialState, ...initializeExpandedNodes(child) };
        });
      }
    }
    return initialState;
  };

  useEffect(() => {
    setExpandedNodes(initializeExpandedNodes(structure));
  }, [structure]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prevState) => ({
      ...prevState,
      [nodeId]: !prevState[nodeId],
    }));
  };

  const renderStructure = (node: Node) => {
    const isExpanded = expandedNodes[node.id] || false;

    return (
      <li key={node.name} className="ml-5 list-none">
        {node.type === 'directory' ? (
          <>
            <div className="flex items-center text-white">
              <span
                onClick={() => toggleNode(node.id)}
                className={`cursor-pointer font-bold flex items-center transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'
                  }`}
              >
                <FaChevronRight />
              </span>
              <span
                className="ml-2 cursor-pointer text-white"
                onClick={() => toggleNode(node.name)}
              >
                {node.name}
              </span>
              <button
                onClick={() => onAddDirectory(node)}
                className="ml-2 p-1 flex items-center cursor-pointer bg-none border-none text-white"
              >
                <FaPlus />
              </button>
              {node.deletable && (
                <button
                  onClick={() => onDeleteDirectory(node)}
                  className="ml-2 p-1 flex items-center cursor-pointer bg-none border-none text-white"
                >
                  <FaTrash />
                </button>
              )}
            </div>
            <ul
              className={`pl-5 mt-1 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 text-white'
                }`}
            >
              {node.children && node.children.map((child) => renderStructure(child))}
            </ul>
          </>
        ) : (
          <div className="flex items-center text-white">
            <FaRegFile className="mr-2" />
            <span>{node.name}</span>
          </div>
        )}
      </li>
    );

  };

  return <ul style={{ paddingLeft: '0' }}>{renderStructure(structure)}</ul>;
};

export default FolderStructure;
