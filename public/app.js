const { useState, useEffect } = React;

const FALLOUT4_QUESTS = {
  "Main Quests": [
    "Out of Time", "Jewel of the Commonwealth", "Unlikely Valentine", "Getting a Clue",
    "Reunions", "Dangerous Minds", "The Glowing Sea", "Hunter/Hunted",
    "The Molecular Level", "Institutionalized", "Mankind - Redefined", "Mass Fusion",
    "Powering Up", "End of the Line", "Airship Down", "Rockets' Red Glare",
    "The Nuclear Option"
  ],
  "Minutemen": [
    "When Freedom Calls", "Sanctuary", "The First Step", "Taking Independence",
    "Old Guns", "Inside Job", "Form Ranks", "Defend the Castle", "The Nuclear Option (Minutemen)"
  ],
  "Brotherhood of Steel": [
    "Fire Support", "Call to Arms", "Semper Invicta", "Shadow of Steel",
    "Tour of Duty", "Show No Mercy", "From Within", "Outside the Wire",
    "Liberty Reprimed", "Blind Betrayal", "Tactical Thinking", "Spoils of War",
    "Ad Victoriam", "The Nuclear Option (BoS)"
  ],
  "Railroad": [
    "Road to Freedom", "Tradecraft", "Boston After Dark", "Mercer Safehouse",
    "Rocket's Red Glare", "Underground Undercover", "Operation Ticonderoga",
    "Precipice of War", "The Nuclear Option (Railroad)"
  ],
  "Institute": [
    "Synth Retention", "The Battle of Bunker Hill", "Mankind - Redefined",
    "Mass Fusion", "Pinned", "Powering Up", "End of the Line", "Airship Down"
  ],
  "Side Quests": [
    "The Silver Shroud", "The Big Dig", "Diamond City Blues", "Here There Be Monsters",
    "Last Voyage of the U.S.S. Constitution", "Emergent Behavior", "The Gilded Grasshopper",
    "Confidence Man", "Human Error", "In Sheep's Clothing", "Curtain Call",
    "Painting the Town", "Emogene Takes a Lover", "Long Time Coming",
    "Order Up", "The Secret of Cabot House", "Special Delivery", "Mystery Meat"
  ],
  "Companion Quests": [
    "Benign Intervention (Curie)", "Emergent Behavior (Curie)", "Long Road Ahead (MacCready)",
    "Blind Betrayal (Danse)", "The Disappearing Act (Deacon)", "Reunions (Nick Valentine)",
    "Story of the Century (Piper)", "Unlikely Valentine (Nick)", "Human Error (Covenant)",
    "In Sheep's Clothing (Covenant)", "Cait Affinity Quest", "Strong Affinity Quest"
  ],
  "DLC - Far Harbor": [
    "Far From Home", "Walk in the Park", "Where You Belong", "Best Left Forgotten",
    "The Way Life Should Be", "Cleansing the Land", "Reformation", "Visions in the Fog"
  ],
  "DLC - Nuka-World": [
    "The Gauntlet", "An Ambitious Plan", "Home Sweet Home", "The Grand Tour",
    "Power Play", "Open Season"
  ],
  "DLC - Automatron": [
    "Mechanical Menace", "A New Threat", "Headhunting", "Rogue Robot", "Restoring Order"
  ]
};

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [completedQuests, setCompletedQuests] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadUserProgress();
    }
  }, [currentUser]);

const loadUserProgress = async () => {
  try {
    const response = await fetch(`/api/progress/${currentUser.id}`);
    if (!response.ok) {
      console.error('Failed to load progress');
      return;
    }
    const data = await response.json();
    console.log('Loaded progress:', data); // Debug log
    setCompletedQuests(data);
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
};

  const handleAuth = async () => {
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isRegistering ? '/api/register' : '/api/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify(data.user));
      setCurrentUser(data.user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCompletedQuests({});
    setShowMenu(false);
  };

  const toggleQuest = async (quest) => {
    const newCompleted = !completedQuests[quest];
    const newProgress = {
      ...completedQuests,
      [quest]: newCompleted
    };
    setCompletedQuests(newProgress);

    try {
      await fetch(`/api/progress/${currentUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questName: quest, completed: newCompleted })
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getProgress = () => {
    const total = Object.values(FALLOUT4_QUESTS).flat().length;
    const completed = Object.values(completedQuests).filter(Boolean).length;
    return { total, completed, percentage: Math.round((completed / total) * 100) };
  };

  const filteredQuests = () => {
    if (!searchTerm) return FALLOUT4_QUESTS;
    
    const filtered = {};
    Object.entries(FALLOUT4_QUESTS).forEach(([category, quests]) => {
      const matchingQuests = quests.filter(quest => 
        quest.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingQuests.length > 0) {
        filtered[category] = matchingQuests;
      }
    });
    return filtered;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-green-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md border-2 border-yellow-500">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">FALLOUT 4</h1>
            <p className="text-gray-300">Quest Tracker</p>
          </div>
          
          {error && (
            <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-yellow-500"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-yellow-500"
                placeholder="Enter password"
              />
            </div>
            
            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-yellow-400 hover:text-yellow-300 text-sm"
            >
              {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = getProgress();
  const questData = filteredQuests();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-green-900">
      <header className="bg-gray-800 border-b-2 border-yellow-500 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-yellow-400">FALLOUT 4 QUESTS</h1>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-yellow-400 hover:text-yellow-300"
            >
              <MenuIcon />
            </button>
          </div>
          
          {showMenu && (
            <div className="bg-gray-700 rounded p-4 mb-3">
              <div className="flex items-center justify-between text-gray-300">
                <div className="flex items-center gap-2">
                  <UserIcon />
                  <span>{currentUser.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition-colors"
                >
                  <LogOutIcon />
                  Logout
                </button>
              </div>
            </div>
          )}
          
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search quests..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />
          </div>
          
          <div className="bg-gray-700 rounded p-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Progress</span>
              <span className="text-yellow-400 font-bold">{progress.completed}/{progress.total}</span>
            </div>
            <div className="mt-2 bg-gray-600 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-500 to-green-500 h-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-1 text-yellow-400 font-bold">{progress.percentage}%</div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {Object.entries(questData).map(([category, quests]) => (
          <div key={category} className="mb-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-4 py-3 bg-gray-750 hover:bg-gray-700 flex items-center justify-between transition-colors"
            >
              <span className="text-yellow-400 font-bold text-lg">{category}</span>
              <span className="text-gray-400 text-sm">
                {quests.filter(q => completedQuests[q]).length}/{quests.length}
              </span>
            </button>
            
            {(expandedCategories[category] || searchTerm) && (
              <div className="p-2">
                {quests.map((quest) => (
                  <button
                    key={quest}
                    onClick={() => toggleQuest(quest)}
                    className={`w-full px-4 py-3 mb-2 rounded flex items-center justify-between transition-all ${
                      completedQuests[quest]
                        ? 'bg-green-900 border border-green-600'
                        : 'bg-gray-700 hover:bg-gray-650 border border-gray-600'
                    }`}
                  >
                    <span className={`text-left ${completedQuests[quest] ? 'text-green-200 line-through' : 'text-gray-200'}`}>
                      {quest}
                    </span>
                    {completedQuests[quest] ? (
                      <span className="text-green-400"><CheckIcon /></span>
                    ) : (
                      <span className="text-gray-500"><XIcon /></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));