import jsonData from "./jsonData.json";

function App() {
  const data = jsonData;
  const hoursData = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getLast15Days = () => {
    const last15Days = [];
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = lastDayOfMonth; i > lastDayOfMonth - 16; i--) {
      last15Days.push(i);
    }

    return last15Days;
  };

  const last15Days = getLast15Days();

  return (
    <div style={{ padding: "1%" }}>
      <h2>SustLabsAssignment</h2>
      <table cellSpacing={15}>
        <thead>
          <tr>
            <th>Hours</th>
            {hoursData.map((hour, index) => {
              return (
                <th
                  key={index}
                  style={{
                    visibility: index % 2 === 0 ? "visible" : "hidden",
                  }}
                >
                  {hour}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((hour, index) => {
            const currentDate = last15Days[index % last15Days.length];
            const hourDataArray = hour?.hours.map(
              (hourData) => hourData?.record_count
            );
            const emptyDataArray = new Array(24 - hourDataArray.length).fill(0);
            const combinedDataArray = hourDataArray.concat(emptyDataArray);

            return (
              <tr key={index}>
                <td>{currentDate}</td>
                {combinedDataArray?.map((recordCount, colIndex) => {
                  return (
                    <td
                      key={colIndex}
                      style={{
                        backgroundColor:
                          recordCount === 0
                            ? "lightgray"
                            : `rgba(0, 143, 0, ${recordCount / 1000})`,
                        borderRadius: "20%",
                        height: "1.2rem",
                        width: "1.2rem",
                      }}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
