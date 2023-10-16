import { compare, hash } from 'bcrypt';
const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isMatch = await compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

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

export { hashPassword, comparePassword, formatMessageDate };
