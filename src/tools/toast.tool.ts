import toast from 'react-hot-toast'

export default class Toast {
  public static Blank(
    message: string,
    duration: number = 4000,
    background: string = '#222723',
    position:
      | 'bottom-right'
      | 'bottom-left'
      | 'top-left'
      | 'top-right' = 'bottom-right',
    color: string = 'white',
  ) {
    return toast(message, {
      duration,
      position,
      style: {
        background,
        color,
      },
    })
  }

  public static Icon(
    message: string,
    icon: string,
    duration: number = 4000,
    background: string = '#222723',
    position:
      | 'bottom-right'
      | 'bottom-left'
      | 'top-left'
      | 'top-right' = 'bottom-right',
    color: string = 'white',
  ) {
    return toast(message, {
      duration,
      position,
      style: {
        background,
        color,
      },
      icon,
    })
  }

  public static Success(
    message: string,
    duration: number = 4000,
    background: string = '#222723',
    position:
      | 'bottom-right'
      | 'bottom-left'
      | 'top-left'
      | 'top-right' = 'bottom-right',
    color: string = 'white',
  ) {
    return toast.success(message, {
      duration,
      position,
      style: {
        background,
        color,
      },
    })
  }

  public static Error(
    message: string,
    duration: number = 4000,
    background: string = '#222723',
    position:
      | 'bottom-right'
      | 'bottom-left'
      | 'top-left'
      | 'top-right' = 'bottom-right',
    color: string = 'white',
  ) {
    return toast.error(message, {
      duration,
      position,
      style: {
        background,
        color,
      },
    })
  }

  public static Loading(
    message: string,
    duration: number = 4000,
    background: string = '#222723',
    position:
      | 'bottom-right'
      | 'bottom-left'
      | 'top-left'
      | 'top-right' = 'bottom-right',
    color: string = 'white',
  ) {
    return toast.loading(message, {
      duration,
      position,
      style: {
        background,
        color,
      },
    })
  }
}
