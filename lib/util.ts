function formatMessageDate(messageDate: Date): string {
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now.getTime() - messageDate.getTime();

  // Check if it's today
  if (
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear()
  ) {
    return `Today ${messageDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  }

  // Check if it's yesterday
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  if (timeDifference <= millisecondsInDay) {
    return `Yesterday ${messageDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  }

  return messageDate.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
}

function extractCompanyAndUsername(link: string): string {
  const githubRegex = /github\.com\/([a-zA-Z0-9-]+)/;
  const linkedinRegex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/;
  const twitterRegex = /twitter\.com\/([a-zA-Z0-9_]+)/;

  if (githubRegex.test(link)) {
    const match = link.match(githubRegex);
    return `GitHub: ${match![1]}`;
  } else if (linkedinRegex.test(link)) {
    const match = link.match(linkedinRegex);
    return `LinkedIn: ${match![1]}`;
  } else if (twitterRegex.test(link)) {
    const match = link.match(twitterRegex);
    return `Twitter: ${match![1]}`;
  } else {
    return 'Unknown: Unknown';
  }
}

export { formatMessageDate, extractCompanyAndUsername };
