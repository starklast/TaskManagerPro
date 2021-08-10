const { Schema, model } = require('mongoose')

const TaskSchema = new Schema({
  parent_id: { type: Schema.Types.ObjectId, ref: 'Task' },
  key: { type: Number },
  title: { type: String },
  description: { type: String },
  prioritY: { type: String },
  status: { type: String },
  created_date: { type: Date },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  responsible_id: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = model('Task', TaskSchema)

/* fields[ID] = {
  title: 'ID',
  type: 'integer',
  primary: true,
  readonly: true,
}
fields[PARENT_ID] = {
  title: 'ID родительской задачи',
  type: 'integer',
  referenceType: TASKS,
  default: 0,
}
fields[TITLE] = {
  title: 'Название',
  type: 'string',
  required: true,
  refitem: true,
  refitemtype: REFTYPETASK,
}
fields[DESCRIPTION] = {
  title: 'Описание',
  type: 'string',
}

fields[PRIORITY] = {
  title: 'Приоритет',
  type: TYPE_ENUM,
  values: {
    '2': 'Высокий',
    '1': 'Средний',
    '0': 'Низкий',
  },
  default: 1,
}
fields[STATUS] = {
  title: 'Статус',
  type: TYPE_ENUM,
  values: {
    '1': 'Новая',
    '2': 'Ждет выполнения',
    '3': 'Выполняется',
    '4': 'Ожидает контроля',
    '5': 'Завершена',
    '6': 'Отложена',
  },
  default: 1,
}
fields[CREATED_BY] = {
  title: 'Постановщик',
  type: 'integer',
  referenceType: USERS,
  required: true,
}
fields[CREATED_DATE] = {
  title: 'Дата создания',
  type: TYPE_DATETIME,
  readonly: true,
}
fields[RESPONSIBLE_ID] = {
  title: 'Исполнитель',
  type: 'integer',
  referenceType: USERS,
  required: true,
} */
