function timer(id, deadline) {
  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.now();
    return {
      total: t,
      days: Math.floor(t / (1000 * 60 * 60 * 24)),
      hours: Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((t / (1000 * 60)) % 60),
      seconds: Math.floor((t / 1000) % 60),
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");

    const updateClock = () => {
      const t = getTimeRemaining(endtime);
      if (t.total <= 0) return clearInterval(timeInterval);

      days.textContent = t.days.toString().padStart(2, "0");
      hours.textContent = t.hours.toString().padStart(2, "0");
      minutes.textContent = t.minutes.toString().padStart(2, "0");
      seconds.textContent = t.seconds.toString().padStart(2, "0");
    };

    updateClock();
    const timeInterval = setInterval(updateClock, 1000);
  };

  setClock(id, deadline);
}

export default timer;
