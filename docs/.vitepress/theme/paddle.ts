import type {Paddle} from '@paddle/paddle-js';
import {useData} from "vitepress";


/* Configuration */

const sandboxConfiguration = {
  isProduction: false,
  token: 'test_42032b2ff8076c730cbd2680e0d',
  professionalLicenseId: 'pri_01jv41j5bk9jb3sqxstc8me53x',
  enterpriseLicenseId: 'pri_01j1j2fx3cnbmf4r1816atx35g',
};

const productionConfiguration = {
    isProduction: true,
    token: 'live_aae6e100288a0ab158a101d61e6',
    professionalLicenseId: 'pri_01jz1b9qe7mez8nrdk00wqyrpn',
    enterpriseLicenseId: 'pri_01kevkewbnvgh65eq457v70c99',
};


/* Configuration selector */

const configuration = productionConfiguration;


/* Implementation */

let paddlePromise: Promise<Paddle | undefined> | null = null;

async function loadPaddle(): Promise<Paddle | undefined> {
  if (typeof window === 'undefined')
    return undefined;

  if (paddlePromise)
    return await paddlePromise;

  paddlePromise = import('@paddle/paddle-js')
      .then(({initializePaddle}) => {

        return initializePaddle({
          token: configuration.token,
          environment: configuration.isProduction ? 'production' : 'sandbox',
        });
      })
      .catch(() => {
        paddlePromise = null;
        return undefined;
      });

  return await paddlePromise;
}

if (typeof window !== 'undefined') {
  void loadPaddle();
}

export const usePaddle = () => {
  const {isDark} = useData();

  async function startCheckout(priceId: string) {
    const paddle = await loadPaddle();

    if (!paddle)
      return;

    paddle.Checkout.open({
      settings: {
        variant: 'one-page',
        theme: isDark.value ? 'dark' : 'light',
        displayMode: 'overlay',
        showAddTaxId: true,
        showAddDiscounts: true,
        successUrl: "https://www.questpdf.com/license/purchase-success.html"
      },
      items: [
        {
          priceId: priceId,
          quantity: 1
        }
      ]
    });
  }

  return {
    startCheckout,
    professionalLicensePriceId: configuration.professionalLicenseId,
    enterpriseLicensePriceId: configuration.enterpriseLicenseId,
  };
}
