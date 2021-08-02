class Tasks {
  constructor() {
    this.data = [
      {
        id: '1',
        TITLE: 'd cel 2',
        DESCRIPTION:
          'd cel 3 s df sdf sdfsd fsdf sdf sdfsd fsdf sd fsdfsdf sdfsdf sdf sd f',
        STATUS: 1,
        CREATED_BY: 1,
        RESPONSIBLE_ID: 2,
        PRIORITY: 1,
      },
      {
        id: '2',
        TITLE: '2 d cel 2',
        DESCRIPTION: '2 d cel 3',
        STATUS: 2,
        CREATED_BY: 1,
        RESPONSIBLE_ID: 2,
        PRIORITY: 1,
      },
      {
        id: '3',
        TITLE: '2 d cel 2',
        DESCRIPTION: '2 d cel 3',
        STATUS: 2,
        CREATED_BY: 1,
        RESPONSIBLE_ID: 2,
        PRIORITY: 1,
      },
    ]
    this.findOne = this.findOne.bind(this)
    this.findById = this.findById.bind(this)
  }
  findOne(filds) {
    return this.data.find((item) => {
      for (const key in filds) {
        if (Object.hasOwnProperty.call(filds, key)) {
          if (filds[key] !== item[key]) {
            return false
          }
          return true
        }
      }
    })
  }

  findById(id) {
    return this.data.find((item) => item.id == id)
  }
}
const tasks = [
  {
    id: '1',
    TITLE: 'd cel 2',
    DESCRIPTION:
      'd cel 3 s df sdf sdfsd fsdf sdf sdfsd fsdf sd fsdfsdf sdfsdf sdf sd f',
    STATUS: 1,
    CREATED_BY: 1,
    RESPONSIBLE_ID: 2,
    PRIORITY: 1,
  },
  {
    id: '2',
    TITLE: '2 d cel 2',
    DESCRIPTION: '2 d cel 3',
    STATUS: 2,
    CREATED_BY: 1,
    RESPONSIBLE_ID: 2,
    PRIORITY: 1,
  },
  {
    id: '3',
    TITLE: '2 d cel 2',
    DESCRIPTION: '2 d cel 3',
    STATUS: 2,
    CREATED_BY: 1,
    RESPONSIBLE_ID: 2,
    PRIORITY: 1,
  },
]

module.exports = { Tasks: new Tasks() }
