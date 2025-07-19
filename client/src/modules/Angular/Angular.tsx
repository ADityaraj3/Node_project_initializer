import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FolderStructure from '../../base/FolderStructure/FolderStructure';
import { Node, PackageJson } from '../../utlis/Interfaces/Interface';
import { addNpmPackage, handleAddDirectory, handleDeleteDirectory, handleDeletePackage, searchNpmPackages, handleSaveStructureProject, fetchStructureProjectAngular } from '../../utlis/common/common.utils';
import CustomLoader from '../../base/CustomLoader/CustomLoader';
import CustomSelect from '../../base/CustomSelect/CustomSelect';

const Angular: React.FC = () => {
    const [structure, setStructure] = useState<Node | null>(null);
    const [packageJson, setPackageJson] = useState<PackageJson[]>([]);
    const [npmPackages, setNpmPackages] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [, setSelectedPackage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchStructure = async () => {
        try {
            setLoading(true);
            await fetchStructureProjectAngular('http://128.199.27.112:3003/angular-app/fetch-structure', {
            }, setStructure);
        } catch (error) {
            console.error('Error fetching structure:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveStructure = async () => {
        await handleSaveStructureProject('http://128.199.27.112:3003/angular-app/create', {
            structure: structure,
            packageJson: packageJson,
        }, "angular-app");
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

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-dark min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Angular App Configurator
                    </span>
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <CustomLoader />
                    </div>
                ) : (
                    <div className="mt-6">
                        <motion.div
                            className="bg-card-bg rounded-xl p-6 mb-8 border border-gray-800"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-semibold mb-4">Framework Settings</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="col-span-full flex justify-end">
                                    <button
                                        onClick={fetchStructure}
                                        className="btn btn-primary"
                                    >
                                        Refresh Structure
                                    </button>
                                </div>
                            </div>

                        </motion.div>

                        {structure ? (
                            <div className="grid lg:grid-cols-3 gap-8">
                                <motion.div
                                    className="lg:col-span-2 bg-card-bg rounded-xl p-6 border border-gray-800"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h2 className="text-xl font-semibold mb-4">Folder Structure</h2>
                                    <div className="bg-darker rounded-lg p-4 overflow-auto max-h-[500px]">
                                        <FolderStructure
                                            structure={structure}
                                            onAddDirectory={(node) => handleAddDirectory(node, setStructure)}
                                            onDeleteDirectory={(node) => handleDeleteDirectory(node, setStructure)}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="bg-card-bg rounded-xl p-6 border border-gray-800"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h2 className="text-xl font-semibold mb-4">Package Manager</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-400 mb-2">Search NPM Packages</label>

                                            {/* Search Input */}
                                            <input
                                                type="text"
                                                placeholder="Search packages..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />

                                            {/* Select Dropdown */}
                                            <CustomSelect
                                                label="Search NPM Packages"
                                                value=""
                                                onChange={(e) =>
                                                    addNpmPackage(e.target.value, setPackageJson, setSelectedPackage)
                                                }
                                                options={npmPackages.map((pkg) => ({ label: pkg, value: pkg }))}
                                                placeholder="Select the searched package"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">Added Packages</h3>
                                            <div className="bg-darker rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
                                                {packageJson.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {packageJson.map((pkg) => (
                                                            <div key={pkg.name} className="flex items-center bg-card-bg rounded-md px-3 py-2">
                                                                <span className="text-sm">
                                                                    <span className="text-primary font-medium">{pkg.name}</span>
                                                                    <span className="text-gray-500 ml-1">@{pkg.version}</span>
                                                                </span>
                                                                <button
                                                                    onClick={() => handleDeletePackage(pkg.name, setPackageJson)}
                                                                    className="ml-2 text-gray-400 hover:text-red-500"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 text-center py-4">No packages added yet</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-400">Loading project structure...</p>
                            </div>
                        )}

                        {structure && (
                            <motion.div
                                className="mt-8 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <button
                                    onClick={handleSaveStructure}
                                    className="btn btn-secondary px-8 py-3 text-lg shadow-xl"
                                >
                                    Generate Project
                                </button>
                            </motion.div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Angular;