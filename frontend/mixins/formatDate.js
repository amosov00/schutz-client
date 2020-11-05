import moment from "moment";

export default {
  methods: {
    timestampToDate(timstamp) {
      // Конвертация timestamp в обычный формат даты
      return moment
        .unix(timstamp)
        .utc()
        .add(3, "hours")
        .format("DD/MM/YYYY");
    },
    timestampFromUtc(timestamp) {
      return moment(timestamp)
        .utc()
        .add(3, "hours")
        .format("DD MMMM YYYY HH:mm:ss");
    },
    readableDate(timestamp) {
      return moment
        .unix(timestamp)
        .utc()
        .add(3, "hours")
        .format("DD MMMM YYYY");
    },
    readableDateWithoutDays(timestamp) {
      return moment
        .unix(timestamp)
        .utc()
        .add(3, "hours")
        .format("MMMM YYYY");
    },
    createdTime(timestamp) {
      return moment(timestamp)
        .utc()
        .format("DD MMMM YYYY");
    }
  }
};
