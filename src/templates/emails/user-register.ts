interface templateProps {
  username: string;
}

const getEmailRegisterTemplate = ({ username }: templateProps) => {
  return `
    <h1>Welcome, ${username}!</h1>
    <p>Thank you for registering on our platform.</p>
    <p>We're excited to have you onboard.</p>
    <p>Best Regards,<br>Team</p>
  `;
};

const getTemplatePasswordReset = () => {};

export { getEmailRegisterTemplate, getTemplatePasswordReset };
