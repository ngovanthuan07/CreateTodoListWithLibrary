import html from "../core.js";
import { connect } from "../store.js";

const connector = connect();

function TodoItem({todo, index, editId}) {
  return html`
    <li 
      class="${todo.completed && 'completed'} 
        ${todo.id === editId && 'editing'}">
      <div class="view">
        <input
            class="toggle"
            type="checkbox"
            ${todo.completed && 'checked'} 
            onchange="dispatch('toggle', '${todo.id}')"
        />
        <label ondblclick="dispatch('startEdit', '${todo.id}')">${todo.title}</label>
        <button class="destroy" onclick="dispatch('destroy', '${todo.id}')"></button>
      </div>
      <input
        class="edit"
        value="${todo.title}" 
        onkeyup="event.keyCode === 13 && dispatch('endEdit', this.value.trim()) || event.keyCode === 27 && dispatch('cancelEdit')"
        onblur="dispatch('endEdit', this.value.trim())"
        />
    </li>
  `;
}

export default connect()(TodoItem)
