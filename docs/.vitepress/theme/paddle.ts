import type {Environments, Paddle} from '@paddle/paddle-js';
import {useData} from "vitepress";


/* Configuration */

interface Configuration {
  environment: Environments;
  token: string;
  professionalLicensePriceId: string;
  enterpriseLicensePriceId: string;
}

const sandboxConfiguration: Configuration = {
  environment: 'sandbox',
  token: 'test_42032b2ff8076c730cbd2680e0d',
  professionalLicensePriceId: 'pri_01jv41j5bk9jb3sqxstc8me53x',
  enterpriseLicensePriceId: 'pri_01j1j2fx3cnbmf4r1816atx35g',
};

const productionConfiguration: Configuration = {
  environment: 'production',
  token: 'live_aae6e100288a0ab158a101d61e6',
  professionalLicensePriceId: 'pri_01kwq136d75spr88pmq7txaayw',
  enterpriseLicensePriceId: 'pri_01kwq14xaqf9kz54jvya86cx6q',
};


/* Configuration selector */

const configuration = productionConfiguration;


/* Implementation */

let paddlePromise: Promise<Paddle | undefined> | null = null;

/* client only (Layout.vue calls it on mount); a failed load is retried on the next call */
export function loadPaddle(): Promise<Paddle | undefined> {
  paddlePromise ??= import('@paddle/paddle-js')
      .then(({initializePaddle}) => initializePaddle({
        token: configuration.token,
        environment: configuration.environment,
      }))
      .catch(() => {
        paddlePromise = null;
        return undefined;
      });

  return paddlePromise;
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
    professionalLicensePriceId: configuration.professionalLicensePriceId,
    enterpriseLicensePriceId: configuration.enterpriseLicensePriceId,
  };
}
