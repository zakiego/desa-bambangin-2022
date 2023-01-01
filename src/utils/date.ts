const dateToIndonesiaFormat = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default dateToIndonesiaFormat;
