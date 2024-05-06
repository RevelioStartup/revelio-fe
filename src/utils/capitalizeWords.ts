export function capitalizeWords(str: string) {
  const exceptions = ['ai']
  const words = str.split('_')

  const capitalizedWords = words.map((word) => {
    if (!exceptions.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return word.toUpperCase()
  })

  return capitalizedWords.join(' ')
}
