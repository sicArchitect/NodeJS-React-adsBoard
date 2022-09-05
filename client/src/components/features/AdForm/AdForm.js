import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

const AddAdForm = ({ action, actionText, ...props }) => {
  const newDate = new Date();
  const user = useSelector(getUser);

  const id = props.id;
  const [title, setTitle] = useState(props.title || '');
  const [username, setUsername] = useState(props.username || '');
  const [description, setDescription] = useState(props.description || '');
  const [date, setDate] = useState(props.date || newDate);
  const [image, setImage] = useState(props.image || '');
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');

  const handleSubmit = () => {
    action({
      id,
      title,
      username: user.login,
      description,
      date: newDate,
      image,
      price,
      location,
    });
  };

  return (
    <Form className="col-12 col-sm-6 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Add your ad</h1>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          value={image}
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.date)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddAdForm;