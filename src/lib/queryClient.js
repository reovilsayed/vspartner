import toast from "react-hot-toast";
import { QueryCache, QueryClient } from "react-query";
import { format, isToday, isYesterday } from "date-fns";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
});

export const notify = (message = "Successfully Updated!", error = false) => {
  if (!error) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

const getImageURL = (file) => {
  return "https://vsclips.s3.us-east-2.amazonaws.com/" + file;
};

export default getImageURL;

const currentYear = new Date().getFullYear();
export const getYearList = (date) => {
  const list = [];
  for (let year = date; year <= currentYear; year++) {
    list.push({ value: year, label: year });
  }
  return list;
};

export const getDateTime = (d) => {
  const today = d ? new Date(d) : new Date();
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(today);

  const time = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  }).format(today);
  return { date, time: time.toLowerCase(), isSuccess: !!d };
};
export const plainDateTime = (d) => {
  if (d) {
    return (
      <>
        {getDateTime(d).date}
        <br />
        {getDateTime(d).time} UTC
      </>
    );
  }
  return "";
};

export const styledDateTime = (d) => {
  const dateTime = d.split("T");
  const date = dateTime[0].split("-").reverse().join(".");
  const tmpTime = dateTime[1].split(".")[0].split(":");
  const time = `${tmpTime[0] >= 12 ? tmpTime[0] - 12 : tmpTime[0]}.${
    tmpTime[1]
  }${tmpTime[0] >= 12 ? "pm" : "am"}`;

  return { date: date, time: time };
};

export const todayDateTime = () => {
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return {
    day: dayNames[date.getDay()],
    date: date.getDate(),
    month: monthNames[date.getMonth()],
  };
};

export const plainTime = (d) => {
  if (d) {
    return <>{getDateTime(d).time}</>;
  }
  return "";
};
export const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => notify("Copied"))
    .catch(() => notify("copy fail", true));
};

export const getTitle = (date) => {
  if (isToday(new Date(date))) {
    return "Today";
  } else if (isYesterday(new Date(date))) {
    return "Yesterday";
  } else {
    return format(new Date(date), "dd.MM.yyyy");
  }
};
