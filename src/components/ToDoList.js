import React from 'react'
import { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import store from 'store'

let listId = store.get("listId")


const ToDoList = () => {

    const [toDoItems, setToDoItems] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        async function fetchData() {
            if (!listId) {
                listId = uuidv4()
                store.set("listId", listId)
            }
            const itemsList = await axios.get(`https://kvdb.io/RqyRuHjZX8Z87JhBMhZZu6/${listId}`)
            setToDoItems(itemsList.data.updatedItems)
        }
        fetchData()
    }, []);

    const handleAdd = async () => {
        try {
            const updatedItems = [...toDoItems]
            updatedItems.push(inputValue)
            setToDoItems(updatedItems)
            await axios.post(`https://kvdb.io/RqyRuHjZX8Z87JhBMhZZu6/${listId}`, { updatedItems })
        } catch (error) {
            console.log(error.toString())
        }
    }

    return (
        <div>
            <h5>TO DO LIST</h5>
            <TextField id="itemInput" label="Add To-Do"
                onChange={({ target }) => setInputValue(target.value)}
                value={inputValue} />
            <AddIcon onClick={handleAdd} />
            <br /><br />
            {toDoItems.map(t => (
                <div key={uuidv4()} >
                    <DoneOutlineRoundedIcon />
                    <span>{t}</span>
                </div>
            ))}
        </div>
    );
};

export default ToDoList;
