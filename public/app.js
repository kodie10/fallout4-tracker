const { useState, useEffect } = React;

const FALLOUT4_QUESTS = {
  "Main Quests": [
    "War Never Changes",
    "Out of Time",
    "Jewel of the Commonwealth",
    "Unlikely Valentine",
    "Getting a Clue",
    "Reunions",
    "Dangerous Minds",
    "The Glowing Sea",
    "Hunter/Hunted",
    "The Molecular Level",
    "Institutionalized",
    "Mankind - Redefined",
    "Mass Fusion",
    "Powering Up",
    "End of the Line",
    "Airship Down",
    "Rockets' Red Glare",
    "The Nuclear Option (Minutemen)",
    "The Nuclear Option (Railroad)",
    "The Nuclear Option (Brotherhood of Steel)",
    "The Nuclear Option (Institute)",
    "Nuclear Family"
  ],
  
  "Minutemen Quests": [
    "When Freedom Calls",
    "Sanctuary",
    "The First Step",
    "Taking Independence",
    "Old Guns",
    "Inside Job",
    "Form Ranks",
    "Defend the Castle",
    "With Our Powers Combined",
    "The Nuclear Option (Minutemen)",
    "Completing the Gauntlet",
    "Patrol",
    "Kidnapping",
    "Raider Troubles",
    "Ghoul Problem",
    "Resettle Refugees",
    "Stop the Raiding",
    "Returning the Favor",
    "Clearing the Way",
    "Defend Artillery at [Settlement]",
    "Defend [Settlement]",
    "Recruitment Beacon"
  ],
  
  "Brotherhood of Steel Quests": [
    "Fire Support",
    "Call to Arms",
    "Semper Invicta",
    "Shadow of Steel",
    "Tour of Duty",
    "Show No Mercy",
    "From Within",
    "Outside the Wire",
    "Liberty Reprimed",
    "Blind Betrayal",
    "Tactical Thinking",
    "Spoils of War",
    "Ad Victoriam",
    "A New Dawn",
    "The Nuclear Option (BoS)",
    "Feeding the Troops",
    "Leading by Example",
    "Quartermastery",
    "Cleansing the Commonwealth",
    "Learning Curve",
    "Reactor Coolant",
    "Duty or Dishonor",
    "Blood Bank",
    "Airship Down"
  ],
  
  "Railroad Quests": [
    "Road to Freedom",
    "Tradecraft",
    "Boston After Dark",
    "Mercer Safehouse",
    "Rockets' Red Glare",
    "Underground Undercover",
    "Operation Ticonderoga",
    "Precipice of War",
    "The Nuclear Option (Railroad)",
    "Burning Cover",
    "Memory Interrupted",
    "Butcher's Bill",
    "Butcher's Bill 2",
    "Weathervane",
    "Concierge",
    "High Ground",
    "Variable Removal",
    "To the Mattresses",
    "Randolph Safehouse",
    "A Clean Equation",
    "Boston After Dark",
    "Mercer Safehouse"
  ],
  
  "Institute Quests": [
    "Institutionalized",
    "Synth Retention",
    "The Battle of Bunker Hill",
    "Mankind - Redefined",
    "Mass Fusion",
    "Pinned",
    "Powering Up",
    "End of the Line",
    "Airship Down",
    "Nuclear Family",
    "Building a Better Crop",
    "Plugging a Leak",
    "Pest Control",
    "Politics and Plots",
    "Reclamation",
    "A House Divided",
    "Humanity Redefined",
    "Banished from the Institute"
  ],
  
  "Side Quests": [
    "The Silver Shroud",
    "The Big Dig",
    "Diamond City Blues",
    "Here There Be Monsters",
    "Last Voyage of the U.S.S. Constitution",
    "Emergent Behavior",
    "The Gilded Grasshopper",
    "Confidence Man",
    "Human Error",
    "In Sheep's Clothing",
    "Curtain Call",
    "Painting the Town",
    "Emogene Takes a Lover",
    "Long Time Coming",
    "Order Up",
    "The Secret of Cabot House",
    "Special Delivery",
    "Mystery Meat",
    "Trouble Brewin'",
    "Hole in the Wall",
    "Cambridge Polymer Labs",
    "Kid in a Fridge",
    "Last Voyage of the USS Constitution",
    "The Dig",
    "Vault 81",
    "Short Stories",
    "Covenant",
    "The Devil's Due",
    "Brain Dead",
    "Diamond City Radio",
    "Good Neighbor"
  ],
  
  "Companion Quests": [
    "Benign Intervention (Curie)",
    "Emergent Behavior (Curie)",
    "Long Road Ahead (MacCready)",
    "Blind Betrayal (Danse)",
    "The Disappearing Act (Deacon)",
    "Reunions (Nick Valentine)",
    "Story of the Century (Piper)",
    "Unlikely Valentine (Nick)",
    "Cait's Affinity Quest",
    "Strong's Affinity Quest",
    "Codsworth's Affinity Quest",
    "Dogmeat's Affinity Quest",
    "Hancock's Affinity Quest",
    "X6-88's Affinity Quest",
    "Preston Garvey's Affinity Quest"
  ],
  
  "Miscellaneous Quests": [
    "Tradecraft",
    "Reunions",
    "Dangerous Minds",
    "Getting a Clue",
    "Cambridge Polymer Labs",
    "Covenant",
    "The Devil's Due",
    "Diamond City Blues",
    "Emogene Takes a Lover",
    "The Gilded Grasshopper",
    "Here There Be Monsters",
    "Human Error",
    "The Last Voyage of the USS Constitution",
    "Long Time Coming",
    "Mystery Meat",
    "Out of the Fire",
    "Painting the Town",
    "The Secret of Cabot House",
    "The Silver Shroud",
    "Special Delivery",
    "Trouble Brewin'",
    "Vault 81",
    "Hole in the Wall",
    "Diamond City Radio",
    "Sanctuary Hills",
    "Trip to the Stars",
    "Pull the Plug",
    "The Big Dig",
    "Confidence Man",
    "Kid in a Fridge"
  ],
  
  "DLC - Far Harbor": [
    "Far From Home",
    "Walk in the Park",
    "Where You Belong",
    "Best Left Forgotten",
    "The Way Life Should Be",
    "Cleansing the Land",
    "Reformation",
    "Visions in the Fog",
    "Close to Home",
    "Blood Tide",
    "The Hold Out",
    "Turn Back the Fog",
    "Hull Breach",
    "What Atom Requires",
    "The Heretic",
    "Witch Hunt",
    "The Great Hunt",
    "Rite of Passage",
    "Visions in the Fog",
    "Data Recovery",
    "DiMA's Memories",
    "Acadian Ideals",
    "The Price of Memory",
    "Brain Dead"
  ],
  
  "DLC - Nuka-World": [
    "The Gauntlet",
    "An Ambitious Plan",
    "Home Sweet Home",
    "The Grand Tour",
    "Power Play",
    "Open Season",
    "Precious Cargo",
    "Cappy in a Haystack",
    "Safari Adventure",
    "Dry Rock Gulch",
    "Kiddie Kingdom",
    "Galactic Zone",
    "Nuka-Galaxy",
    "Star Control",
    "A Magical Kingdom",
    "The Lost Patrol",
    "Beverageer",
    "Amoral Combat",
    "Parlor Games",
    "Trip to the Stars",
    "Taken for a Ride",
    "Clearing the Way",
    "Raiding for a Living",
    "Shank's Missions"
  ],
  
  "DLC - Automatron": [
    "Mechanical Menace",
    "A New Threat",
    "Headhunting",
    "Rogue Robot",
    "Restoring Order",
    "Radar Beacon"
  ],
  
  "DLC - Vault-Tec Workshop": [
    "A Model Citizen",
    "Power Cycle",
    "Vision of the Future",
    "Explore Vault 88",
    "Build the Overseer's Desk"
  ],
  
  "DLC - Contraptions Workshop": [
    "Contraptions Workshop Tutorial"
  ],
  
  "DLC - Wasteland Workshop": [
    "Wasteland Workshop Tutorial"
  ],
  
  "Radiant Quests - Minutemen": [
    "Kidnapping at [Settlement]",
    "Raider Troubles at [Settlement]",
    "Super Mutant Threat at [Settlement]",
    "Ghoul Problem at [Settlement]",
    "Greenskins at [Settlement]",
    "Clearing the Way",
    "Returning the Favor",
    "Defend Artillery at [Settlement]",
    "Resettle Refugees at [Settlement]",
    "Stop the Raiding at [Settlement]"
  ],
  
  "Radiant Quests - Brotherhood": [
    "Cleansing the Commonwealth",
    "Learning Curve",
    "Feeding the Troops",
    "Leading by Example",
    "Quartermastery",
    "Reactor Coolant",
    "Duty or Dishonor",
    "Blood Bank",
    "Feeding the Troops"
  ],
  
  "Radiant Quests - Railroad": [
    "Jackpot (Carrington)",
    "Mercer Safehouse",
    "Randolph Safehouse",
    "Concierge",
    "High Ground",
    "Variable Removal",
    "Weathervane",
    "Dead Drop",
    "To the Mattresses",
    "Lost Soul",
    "Operation Ticonderoga"
  ],
  
  "Radiant Quests - Institute": [
    "Building a Better Crop",
    "Plugging a Leak",
    "Pest Control",
    "Reclamation",
    "Political Leanings",
    "A House Divided"
  ],
  
  "Radiant Quests - Misc": [
    "Out of the Fire (Scribe Haylen)",
    "Cleansing the Commonwealth (Knight Rhys)",
    "Quartermastery (Proctor Teagan)",
    "Randolph Safehouse (PAM)",
    "Concierge (Tom)",
    "Variable Removal (Tinker Tom)",
    "Mercer Safehouse (PAM)",
    "Memory Interrupted (Dr. Amari)",
    "Butcher's Bill (Glory)",
    "To the Mattresses (Drummer Boy)"
  ],
  
  "Settlement Quests": [
    "Sanctuary (Minutemen)",
    "The First Step (Minutemen)",
    "Building a Settlement",
    "Defend [Settlement]",
    "Recruitment Radio Beacon",
    "Setting up Supply Lines",
    "Workshop Tutorial",
    "Graygarden",
    "Greentop Nursery",
    "Oberland Station",
    "Sunshine Tidings Co-op",
    "Tenpines Bluff"
  ],
  
  "Location-Based Quests": [
    "Salem Witchcraft Museum",
    "Suffolk County Charter School",
    "Dunwich Borers",
    "Museum of Witchcraft",
    "Jamaica Plain Treasure",
    "Wilson Atomatoys Corporate HQ",
    "Vault 75",
    "Vault 81",
    "Vault 95",
    "Vault 111",
    "Cabot House",
    "Pickman Gallery",
    "Trinity Tower"
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
    const response = await fetch(`/api/progress?userId=${currentUser.id}`);
    if (!response.ok) {
      console.error('Failed to load progress');
      return;
    }
    const data = await response.json();
    console.log('Loaded progress:', data);
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
    await fetch(`/api/progress?userId=${currentUser.id}`, {
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