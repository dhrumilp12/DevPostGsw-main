import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  fetchContent,
  updateContent,
} from '../Actions/adminPanelAction';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users, content } = useSelector(state => state.admin);

  // Local state for creating/updating users and content
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newContent, setNewContent] = useState({ title: '', body: '' });
  const [selectedContentId, setSelectedContentId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchContent());
  }, [dispatch]);

  const handleCreateUser = (e) => {
    e.preventDefault();
    dispatch(createUser(newUser));
  };

  const handleUpdateUser = (userId, userData) => {
    dispatch(updateUser(userId, userData));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleUpdateContent = (contentId, contentData) => {
    dispatch(updateContent(contentId, contentData));
  };

  // Render users and content along with forms to add or update them
  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>Users</h2>
        {users.map(user => (
          <div key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            <button onClick={() => handleUpdateUser(user.id, newUser)}>Update</button>
          </div>
        ))}
        <form onSubmit={handleCreateUser}>
          <input type="text" placeholder="Name" onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <button type="submit">Add User</button>
        </form>
      </div>
      <div>
        <h2>Content</h2>
        {content.map(item => (
          <div key={item.id}>
            {item.title} - {item.body}
            <button onClick={() => setSelectedContentId(item.id)}>Edit</button>
            <button onClick={() => handleUpdateContent(item.id, newContent)}>Update</button>
          </div>
        ))}

        <form>
          <input type="text" placeholder="Title" onChange={(e) => setNewContent({ ...newContent, title: e.target.value })} />
          <textarea placeholder="Body" onChange={(e) => setNewContent({ ...newContent, body: e.target.value })}></textarea>
          <button type="button" onClick={() => handleUpdateContent(selectedContentId, newContent)}>Update Content</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
