const Handlebars = require("handlebars");
const { List } = require("../models");
const dayjs = require("dayjs");

module.exports = {
  //Date format helper function
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  //Adds in the existing value to the edit post page
  title_input: (value, taskId) => {
    const val = Handlebars.escapeExpression(value);
    const taskTitle = `task-title-${taskId}`;
    return new Handlebars.SafeString(
      "<input class='form-input task-title' id=" +
        taskTitle +
        " type='text' value='" +
        val +
        "'/>"
    );
  },
  //Adds in the existing value to the edit post page
  content_input: (value, taskId) => {
    const val = Handlebars.escapeExpression(value);
    const taskDescription = `task-description-${taskId}`;
    return new Handlebars.SafeString(
      "<textarea class='form-input' id=" +
        taskDescription +
        ">" +
        val +
        "</textarea>"
    );
  },
  //Formats the date and adds it to the due date input
  date_input: (value, taskId) => {
    if (value !== undefined) {
      const date = dayjs(value).format("YYYY-MM-DD");
      const taskDate = `task-duedate-${taskId}`;

            const val = Handlebars.escapeExpression(date);

      return new Handlebars.SafeString(
        "<input class='form-input' id=" +
          taskDate +
          " type='date' value='" +
          val +
          "'/>"
      );
    }
  },
  create_icon: (name) => {
    if (name !== undefined) {
      const names = name.split(" ");
      const nameLetters = [];
      for (let i = 0; i < names.length; i++) {
        let firstLetter = names[i][0];
        nameLetters.push(firstLetter);
      }

      if (nameLetters.length === 2) {
        const nameIcon = `${nameLetters[0]}${nameLetters[1]}`;
        return nameIcon;
      }
      if (nameLetters.length === 1) {
        const nameIcon = `${nameLetters[0]}`;
        return nameIcon;
      }
    }
  },

  list_title_input: (value, listId) => {
    const val = Handlebars.escapeExpression(value);
    const listTitle = `list-title-${listId}`;
    return new Handlebars.SafeString(
      "<input class='form-input list-title' id=" +
      listTitle +
        " type='text' value='" +
        val +
        "'/>"
    );
  },
};
