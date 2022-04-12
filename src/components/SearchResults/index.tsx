import { useContext, useEffect, useState } from 'react'
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap'
import { SearchContext, SearchContextType } from '../../context/SearchContext'
import api from '../../services/api'
import styles from './styles.module.scss'

type User = {
    profile: any
}
export function SearchResults() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const { result } = useContext(SearchContext) as SearchContextType;

    async function getSearchResults() {
        try {
            const res = await api.get(`/users/skill/${result}`)
            const data = res.data
            const results = data[0].Profile

            setUsers(results)
            console.log(results)
        } catch (error) {
            console.log('DEU ERRO');
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
    
        getSearchResults()
    }, [result])
    if (loading) {
        return null
    }
    return (
        <section>
            <Row lg={"auto"} md={2} className={styles.cardRow}>
                {users.map((user: User, index) => {
                    return (
                        <Col key={index}>
                            <Card style={{ width: '19.125rem', height: '30.188rem' }}  className={styles.card} >
                                <Card.Img variant="top" className={`rounded-circle ${styles.photo}`}  src={user.profile.photo} alt={`Foto de perfil ${user.profile.nickname}`} />
                                <Card.Body className={styles.bodyStyle}>
                                    <Card.Title className={styles.name}>{user.profile.nickname}</Card.Title>

                                    <Card.Title className={styles.title}>Cargo</Card.Title>
                                    <Card.Text className={styles.text}>
                                        {user.profile.description}
                                    </Card.Text>
                                    <Card.Title className={styles.title}>Senioridade</Card.Title>
                                    <Card.Text className={styles.text}>
                                        {user.profile.seniority}
                                    </Card.Text>
                                    <Card.Title className={styles.title}>Principais Skills</Card.Title>
                                    <Card.Text className={styles.text}>
                                    {user.profile.description}
                                    </Card.Text>
                                    <Button type="button" className={styles.button}>Agendar mentoria</Button>

                                </Card.Body>
                            </Card>
                        </Col>

                    )
                })}
            </Row>
        </section >
    )
}