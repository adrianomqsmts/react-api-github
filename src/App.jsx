import React, { useEffect, useState } from 'react';
import { Card, Container, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch('https://api.github.com/users/adrianomqsmts/repos');
      const data = await response.json();
      setRepositories(data);
    })();
  }, []);

  const updatedAt = (d) => {
    var timeDiff = Math.abs((new Date()) - (new Date(d)));
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
  }

  return (
    <Container>
     
      {repositories
        .sort(({ pushed_at: pre }, { pushed_at: cur }) => updatedAt(pre) - updatedAt(cur))
        .map((repository) => (
          <Card key={repository.id} className='mb-3'>
            <Card.Body>
              <Card.Title className='display-4 text-center'>
                {repository.name}
              </Card.Title>
              <Card.Text>
                Topics: <span> </span>
                {repository.language &&
                  <>
                    <Badge bg="primary" className='h6'>{repository.language}</Badge> <span> </span>
                  </>
                }

                {repository.topics &&
                  repository.topics.map((topic) => (
                    <>
                      <Badge bg="success" className='h6'> {topic} </Badge> <span> </span>
                    </>
                  ))
                }
              </Card.Text>
              <hr />
              <Card.Text className='lead'>
                <strong>Descrição do projeto</strong>: {repository.description}
              </Card.Text>
              <div class="d-flex flex-row-reverse">
                <Button variant="warning" className='text-right' href={repository.html_url}>Ver Repositório</Button>
              </div>

            </Card.Body>
            <Card.Footer className="text-muted text-center">Updated {updatedAt(repository.pushed_at)} days ago</Card.Footer>
          </Card>
        ))}
    </Container>
  );

}


export default App;