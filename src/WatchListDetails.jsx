function WatchListDetails({ userList }) {
  // console.log(userList);
  let empty = true;
  if (userList.length) empty = false;
  return (
    <>
      <div className="watchlist">
        <h2>Watch List Summary</h2>
        <div className="watchlist-details">
          <div>
            <p>#️⃣ {empty ? "N/A" : ` ${userList.length}`}</p>
          </div>
          <div>
            <p>
              🌟{" "}
              {empty
                ? "N/A"
                : (
                    userList.reduce((tot, cur) => {
                      return (tot += Number(cur.userRating));
                    }, 0) / userList.length
                  ).toFixed(2)}{" "}
            </p>
          </div>
          <div>
            <p>
              ⭐{" "}
              {empty
                ? "N/A"
                : (
                    userList.reduce((tot, cur) => {
                      return (tot += Number(cur.rating));
                    }, 0) / userList.length
                  ).toFixed(2)}
            </p>
          </div>
          <div>
            <p>
              ⏳
              {empty
                ? "N/A"
                : userList.reduce((tot, obj) => {
                    return tot + Number(obj.runtime.split(" ")[0]);
                  }, 0)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WatchListDetails;
