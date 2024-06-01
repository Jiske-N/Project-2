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
  title_input: (value) => {
    const val = Handlebars.escapeExpression(value);
    return new Handlebars.SafeString(
      "<input class='form-input task-title' id='task-title' type='text' value='" +
        val +
        "'/>"
    );
  },
  //Adds in the existing value to the edit post page
  content_input: (value) => {
    const val = Handlebars.escapeExpression(value);
    return new Handlebars.SafeString(
      "<textarea class='form-input' id='task-description' >" +
        val +
        "</textarea>"
    );
  },
  //Formats the date and adds it to the due date input
  date_input: (value) => {
    if (value !== undefined) {
      const date = dayjs(value).format("YYYY-MM-DD");

      const val = Handlebars.escapeExpression(date);

      return new Handlebars.SafeString(
        "<input class='form-input' id='task-duedate' type='date' value='" +
          val +
          "'/>"
      );
    }
  },
  create_icon: (name) => {
    const names = name.split(" ");
    const nameLetters = []
    for (let i = 0; i < names.length; i++) {
      let firstLetter = names[i][0];
      nameLetters.push(firstLetter)
    }

    if (nameLetters.length === 2) {
      const nameIcon = `${nameLetters[0]}${nameLetters[1]}`
      return nameIcon
    }
  }






};
