export const getRoleId = (
  roles: any[],
  code: string
) => {
  return roles?.find(
    (role) => role.code === code
  )?.id;
};