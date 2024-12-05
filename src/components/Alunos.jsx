import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Alunos = () => {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        api.get('/alunos')
           .then((response) => setAlunos(response.data))
           .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Lista de Alunos</h1>
            <ul>
                {alunos.map((aluno) => (
                    <li key={aluno.id}>
                        {aluno.nome} - {aluno.matricula}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alunos;
