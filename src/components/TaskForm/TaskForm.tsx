import React from 'react'
import styles from './TaskForm.module.css'
import { ITask } from '../../interfaces/Task'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface Props {
  btnText: string,
  taskList: ITask[],
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null,
  handleUpdate?(id: string, title: string, difficulty: number): void,
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate}: Props) => {
  const [id, setId] = useState<string>('')
  const [title, setTitle] = useState<string>("")
  const [difficulty, setDifficulty] = useState<number>(0)


  useEffect(() => {
    if (task) {
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (handleUpdate) {

      handleUpdate(id, title, difficulty)

    } else {
      
      const id = uuidv4()
      setId(id)
      const newTask: ITask = {id, title, difficulty}
      setTaskList!([...taskList, newTask])
      setTitle('')
      setId('')
      setDifficulty(0)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'title') {
      setTitle(e.target.value)
    } else {
      setDifficulty(parseInt(e.target.value))
    }
  }


  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input type="text" name="title" placeholder='Título da tarefa' onChange={handleChange} value={title}/>
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input type="text" name="difficulty" placeholder='Dificuldade da tarefa' onChange={handleChange} value={difficulty}/>
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm