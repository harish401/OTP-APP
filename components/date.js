export const FormatDateCorrect = (data) => {
    let month = ((data.getMonth() + 1) < 10) ? `0${(data.getMonth() + 1)}` : (data.getMonth() + 1)
    let day = (data.getDate() < 10) ? `0${data.getDate()}` : data.getDate();
    if (data.getDate <10)getDate = '0' + getDate;
    let dateTimeString =
    day +
      '-' +
      month +
      '-' +
      data.getFullYear()

    // var hours = data.getHours();
    // var minutes = data.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12;
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    // dateTimeString = dateTimeString + hours + ':' + minutes + ' ' + ampm;

    return dateTimeString;
  };