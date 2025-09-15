import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  const fetchGroups = async () => {
    const res = await axios.get('http://localhost:5001/api/groups');
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/groups', { name: groupName });
    setGroupName('');
    fetchGroups();
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Create a New Group</h3>
        <form onSubmit={handleCreateGroup}>
          <div className="form-group">
            <label>Group Name</label>
            <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
          </div>
          <button className="btn">Create Group</button>
        </form>
      </div>

      <div className="card">
        <h3>Your Groups</h3>
        {groups.length === 0 ? <p>You haven't created any groups yet.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {groups.map(group => (
              <li key={group.id} style={{ marginBottom: '1rem' }}>
                <Link to={`/groups/${group.id}`} style={{ textDecoration: 'none', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;