import { useState, useRef, useEffect } from 'react';

export type Option = {
  label: string;
  value: string;
};

type SearchableSelectProps = {
  label: string;
  placeholder: string;
  options: Option[];
  onSelect: (value: string) => void;
};

export default function CustomSearchableSelect({
  label,
  placeholder,
  options,
  onSelect,
}: SearchableSelectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions =
    query.length >= 3
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleOptionClick = (option: Option) => {
    onSelect(option.value);
    setQuery(''); // clear input
    setIsOpen(false); // close dropdown
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-[400px] md:w-[500px] lg:w-[600px]" ref={dropdownRef}>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.length >= 3) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
        className="w-full rounded-md bg-gray-100 p-3 text-gray-900 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
      />

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
              {query.length < 3
                ? 'Type at least 3 characters to search'
                : 'No matching results'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}