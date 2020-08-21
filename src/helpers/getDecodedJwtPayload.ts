export function getDecodedJwtPayloadField(key: string) {
  const tokensString: string | null = localStorage.getItem('tokensStatusData')
  if (tokensString) {
    const tokens = JSON.parse(tokensString)
    const accessToken: string = tokens.accessToken
    return JSON.parse(window.atob(accessToken.split('.')[1]))[key]
  }
  return ''
}
