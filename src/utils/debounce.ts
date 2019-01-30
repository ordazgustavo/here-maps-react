// /**
//  * Returns a function, that, as long as it continues to be invoked, will not
//  * be triggered. The function will be called after it stops being called for
//  * N milliseconds. If `immediate` is passed, trigger the function on the
//  * leading edge, instead of the trailing. The function also has a property 'clear'
//  * that is a function which will clear the timer to prevent previously scheduled executions.
//  *
//  * @source underscore.js
//  * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
//  * @param {Function} function to wrap
//  * @param {Number} timeout in ms (`100`)
//  * @param {Boolean} whether to execute at the beginning (`false`)
//  * @api public
//  */

// function debounce(func: () => void, wait: number, immediate: boolean) {
//   let timeout: NodeJS.Timeout | null
//   let args: [] | null
//   let context
//   let timestamp
//   let result
//   if (null == wait) wait = 100

//   function later() {
//     let last = Date.now() - timestamp

//     if (last < wait && last >= 0) {
//       timeout = setTimeout(later, wait - last)
//     } else {
//       timeout = null
//       if (!immediate) {
//         result = func.apply(context, args)
//         context = args = null
//       }
//     }
//   }

//   const debounced = (...args) => {
//     context = this
//     timestamp = Date.now()
//     var callNow = immediate && !timeout
//     if (!timeout) timeout = setTimeout(later, wait)
//     if (callNow) {
//       result = func.apply(context, args)
//       context = args = null
//     }

//     return result
//   }

//   debounced.clear = function() {
//     if (timeout) {
//       clearTimeout(timeout)
//       timeout = null
//     }
//   }

//   debounced.flush = function() {
//     if (timeout) {
//       result = func.apply(context, args)
//       context = args = null

//       clearTimeout(timeout)
//       timeout = null
//     }
//   }

//   return debounced
// }

// export default debounce

function debounce(
  func: (...args: any[]) => void,
  delay: number,
  immediate?: boolean,
) {
  let timeout: NodeJS.Timeout | null

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  return (...args: any[]) => {
    const callNow = immediate && !timeout

    if (!delay && delay !== 0) {
      func(...args)
    } else {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        timeout = null

        if (!immediate) {
          func(...args)
        }
      }, delay)

      if (callNow) {
        func(...args)
      }
    }
  }
}

export default debounce
