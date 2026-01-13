import { useState } from 'react';

export default function QuizSearch({ quizzes, onFiltered }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Extract unique categories and difficulties
  const categories = ['all', ...new Set(quizzes.map(q => q.category))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const handleFilter = () => {
    let filtered = quizzes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    onFiltered(filtered);
  };

  // Trigger filter on any change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setTimeout(handleFilter, 0);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setTimeout(handleFilter, 0);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    setTimeout(handleFilter, 0);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    onFiltered(quizzes);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Quizzes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
