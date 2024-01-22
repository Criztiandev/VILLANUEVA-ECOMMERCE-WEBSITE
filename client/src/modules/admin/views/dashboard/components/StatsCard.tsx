interface Props {
  title: string;
  value: number;
}

const StatsCard = (props: Props) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const nextMonth = currentMonth + 1;
  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, nextMonth, 1);

  const startDateString = startDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const endDateString = endDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="stat w-full border h-[175px] rounded-[5px] bg-white">
      <div className="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-8 h-8 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div className="stat-title">{props.title}</div>
      <div className="stat-value">{props.value}</div>
      <div className="stat-desc">
        {startDateString} - {endDateString}
      </div>
    </div>
  );
};

export default StatsCard;
