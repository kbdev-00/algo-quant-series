const quizzes = [
  {
    id: 'dsa-1',
    title: 'DSA Basics',
    category: 'DSA',
    difficulty: 'easy',
    duration: 7, // minutes
    questions: [
      {
        id: 'q1',
        text: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        answer: 1
      },
      {
        id: 'q2',
        text: 'Which data structure uses FIFO?',
        options: ['Stack', 'Queue', 'Tree', 'Graph'],
        answer: 1
      },
      {
        id: 'q3',
        text: 'Which traversal is used to get sorted order from a BST?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
        answer: 1
      }
    ]
  },
  {
    id: 'apt-1',
    title: 'Apti Speed Test',
    category: 'Aptitude',
    difficulty: 'medium',
    duration: 5,
    questions: [
      {
        id: 'a1',
        text: 'If 5x + 3 = 23, what is x?',
        options: ['2', '4', '5', '6'],
        answer: 2
      },
      {
        id: 'a2',
        text: 'A train covers 240 km in 3 hours. Its speed is?',
        options: ['60 km/h', '70 km/h', '80 km/h', '90 km/h'],
        answer: 0
      },
      {
        id: 'a3',
        text: 'What is 15% of 200?',
        options: ['25', '30', '35', '40'],
        answer: 1
      }
    ]
  },
  {
    id: 'dsa-2',
    title: 'Advanced Algorithms',
    category: 'DSA',
    difficulty: 'hard',
    duration: 15,
    questions: [
      {
        id: 'q1',
        text: 'What is the time complexity of merge sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
        answer: 1
      },
      {
        id: 'q2',
        text: 'Dynamic Programming is based on which principle?',
        options: ['Greedy', 'Divide and Conquer', 'Optimal Substructure', 'Backtracking'],
        answer: 2
      },
      {
        id: 'q3',
        text: 'Which algorithm is used for finding shortest path?',
        options: ['BFS', 'Dijkstra', 'Both A and B', 'DFS'],
        answer: 2
      }
    ]
  },
  {
    id: 'apt-2',
    title: 'Logical Reasoning',
    category: 'Aptitude',
    difficulty: 'hard',
    duration: 10,
    questions: [
      {
        id: 'a1',
        text: 'If A = 1, B = 2... Z = 26, then what is the value of D + U + M + B?',
        options: ['31', '32', '33', '34'],
        answer: 2
      },
      {
        id: 'a2',
        text: 'A man walks 5 km North, then turns right and walks 3 km. How far is he from the starting point?',
        options: ['8 km', '√34 km', '2 km', '√64 km'],
        answer: 1
      },
      {
        id: 'a3',
        text: 'If BRAIN = 16-18-1-9-14, what is CODE?',
        options: ['3-15-4-5', '3-16-4-5', '3-14-4-5', '3-15-4-6'],
        answer: 0
      }
    ]
  },
  {
    id: 'dsa-3',
    title: 'Arrays & Strings',
    category: 'DSA',
    difficulty: 'medium',
    duration: 8,
    questions: [
      {
        id: 'q1',
        text: 'What is the advantage of a hash table?',
        options: ['O(1) average lookup', 'O(log n) lookup', 'O(n) lookup', 'O(n²) lookup'],
        answer: 0
      },
      {
        id: 'q2',
        text: 'How many swaps are needed to reverse an array in place?',
        options: ['n', 'n/2', 'n-1', 'log n'],
        answer: 1
      },
      {
        id: 'q3',
        text: 'What is palindrome check time complexity for a string?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        answer: 0
      }
    ]
  }
]

export default quizzes
