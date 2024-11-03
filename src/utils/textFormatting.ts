export function formatDreamText(text: string): string {
  // Remove only exact duplicated phrases that are right next to each other
  let formatted = text
    .replace(/(\b\w+\b)(\s+\1\b)+/gi, '$1') // Remove immediate word repetitions
    .replace(/\s+/g, ' ')
    .trim();

  // Keep "I dreamed that" only at the start if present, remove others
  if (!/^I dreamed that/i.test(formatted)) {
    formatted = formatted.replace(/I dreamed that |I dream that /gi, '');
  }

  // Capitalize first letter of sentences
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  // Add periods to sentences if missing
  if (!/[.!?]$/.test(formatted)) {
    formatted += '.';
  }

  // Fix basic grammar without removing content
  formatted = formatted
    // Add spaces after punctuation if missing
    .replace(/([.!?,])([A-Za-z])/g, '$1 $2')
    // Capitalize letters after periods
    .replace(/\. ([a-z])/g, (match) => '. ' + match.charAt(2).toUpperCase())
    // Fix only basic grammar issues
    .replace(/ i /g, ' I ')
    .replace(/ im /g, " I'm ")
    // Remove extra spaces
    .replace(/\s+/g, ' ');

  return formatted;
}