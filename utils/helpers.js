const Handlebars = require("handlebars");
const { format } = require("sequelize/lib/utils");

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
      "<input class='form-input' id='task-title' type='text' value='" + val + "'/>"
    );
  },
  //Adds in the existing value to the edit post page
  content_input: (value) => {
    const val = Handlebars.escapeExpression(value);
    return new Handlebars.SafeString(
      "<textarea class='form-input' id='task-description' >" + val + "</textarea>"
    );
  },

  date_input: (value) => {
    if (value !== undefined) {
        const newDate = value.toLocaleDateString();
        const val = Handlebars.escapeExpression(newDate);
    
        return new Handlebars.SafeString(
            "<input class='form-input' id='task-duedate' type='date' value='" + val + "'/>"
        );
    
    }
  },

//   status_input: (value) => {
//     const val = Handlebars.escapeExpression(value);
//     return new Handlebars.SafeString(
//       "<textarea class='form-input' id='post-content' >" + val + "</textarea>"
//     );
//   }
};
