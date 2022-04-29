export const formatUserDatesForBE = (user) => {
  if (user.birthday) user.birthday = new Date(user.birthday).toISOString()
  if (user.deathday) user.deathday = new Date(user.deathday).toISOString()
}

export const formatUserDatesForFE = (user) => {
  if (user.birthday) user.birthday = new Date(user.birthday).toISOString().substr(0, 10)
  if (user.deathday) user.deathday = new Date(user.deathday).toISOString().substr(0, 10)
}
