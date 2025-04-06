function isNumber(token) {
    if (!token || typeof token !== 'string') return false;
  
    let hasDecimal = false;
    let hasDigit = false;
  
    let start = 0;
    if (token[0] === '-') {
      if (token.length === 1) return false; // Just "-"
      start = 1;
    }
  
    for (let i = start; i < token.length; i++) {
      const char = token[i];
  
      if (char === '.') {
        if (hasDecimal) return false;
        hasDecimal = true;
      } else if (char >= '0' && char <= '9') {
        hasDigit = true;
      } else {
        return false;
      }
    }
    return hasDigit; // Prevents "-." from being valid
}

function evaluateExpression(expr) {
    // Surround certain terms in parenthesis. Allows for subtracting negatives. 
    const expression = expr.map(token => (isNumber(token) && token.startsWith('-') ? `(${token})` : token)).join('');
    try {
        return eval(expression);
    } catch (e) {
        return null;
    }
}

export { isNumber, evaluateExpression };