export function scheduleDailyNotification(hour: number, minute: number) {
    const now = new Date();
    const target = new Date();
    target.setHours(hour, minute, 0, 0);
  
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }
  
    const timeout = target.getTime() - now.getTime();
  
    setTimeout(() => {
      new Notification("🧠 Pense à réviser tes cartes aujourd’hui !");
      scheduleDailyNotification(hour, minute);
    }, timeout);
  }
  
  scheduleDailyNotification(new Date().getHours(), new Date().getMinutes() + 1);
