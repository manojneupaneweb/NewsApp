import React, { useState } from 'react'

function TagInput({ tags, setTags }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setInputValue('');
            }
        }
    };

    const removeTag = (tagToRemove) => setTags(tags.filter((tag) => tag !== tagToRemove));

    return (
        <div className="max-w-sm">
            <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add Tags
            </label>
            <input
                type="text"
                id="tags"
                placeholder="Enter tags"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                    <div key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-blue-800"
                            aria-label={`Remove tag ${tag}`}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TagInput;