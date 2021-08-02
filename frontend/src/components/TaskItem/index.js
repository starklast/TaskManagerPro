import React from 'react'
import { Link } from 'react-router-dom'
import { RiTodoLine, RiEdit2Line, RiDeleteBin2Line } from 'react-icons/ri'
import styles from './app.module.css'
import Button from '~/common/components/Button'
import { getPathByName } from '~/routes'
function TaskItem({ task }) {
  return (
    <div className={styles.taskConteiner}>
      <div className={styles.taskTitle}>
        <RiTodoLine />
        <div className={styles.span}>{task.title}</div>
      </div>
      <div className={styles.taskText}>{task.text}</div>
      <div>
        <Link to={getPathByName('TaskView').replace(/:id/, task.id)}>
          <RiEdit2Line fontSize='1.5rem' />
        </Link>
        <Button
          className={[styles.btn, styles.ml2]}
          disabled={true}
          onClick={() => {
            task.deleteTask()
          }}
        >
          <RiDeleteBin2Line fontSize='1.5rem' />
        </Button>
      </div>
    </div>
  )
}

export default TaskItem
