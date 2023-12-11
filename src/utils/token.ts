import cookie from 'js-cookie';

class CookieItem {
  private NAME: string;

  constructor(name: string) {
    this.NAME = name;
  }

  public get = (): string | null => cookie.get(this.NAME) || null;

  public set = (token: string | null) => {
    if (!token) {
      return cookie.remove(this.NAME, {});
    }

    return cookie.set(this.NAME, token);
  };
}

const accessTokenName = 'token';

const tokens = {
  access: new CookieItem(accessTokenName),
};

export default tokens;
