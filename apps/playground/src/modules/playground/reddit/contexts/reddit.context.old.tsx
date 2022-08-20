import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { InterpreterFrom } from 'xstate';
import { useActor, useInterpret, useSelector } from '@xstate/react';

import { showNotification } from '@mantine/notifications';
import { X } from 'tabler-icons-react';

import { getFlairs } from '../libs/functions';
// import { redditMachine } from '../machines/reddit.machine';
import { redditMachine } from '../machines/reddit.machine.old';

type RedditMachine = typeof redditMachine;

export interface RedditContext {
  service: InterpreterFrom<RedditMachine>;
  flairs: {
    selected: string[];
    all: string[];
  };
  actions: {
    selectSubreddit: (subreddit: string) => void;
    setFlairs: (flairs: string[]) => void;
  };
}

const RedditContext = createContext<RedditContext>({} as RedditContext);

export const RedditProvider: React.FC = ({ children }) => {
  const _machine = useMemo(() => redditMachine, [redditMachine]);
  const service = useInterpret<RedditMachine>(_machine, {
    actions: {
      notifyError: (context, event) => {
        showNotification({
          id: 'reddit-fetch-fail',
          title: 'Reddit Deck Error',
          message: `${(event.data as Error).message} ${context.subreddit}`,
          color: 'red',
          icon: <X size={14} />,
        });
      },
    },
  });

  const context = useSelector(
    service,
    (state) => state.context
    //   (prev, curr) => {
    //   /**
    //    * @dev right now xState throws error/warning of possible infinite loop without
    //    * this `compare` function. AFAIK a solution is in development but right now
    //    * the only way to avoid the error (and problems) is to check the state
    //    * similar to a `shouldComponentUpdate`.
    //    * @see https://github.com/statelyai/xstate/discussions/3379
    //    * @see https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot
    //    */
    //   const { subreddit: pSub, flairs: pFlairs, posts: pPosts } = prev;
    //   const { subreddit: cSub, flairs: cFlairs, posts: cPosts } = curr;
    //   if (cSub !== pSub || cFlairs !== pFlairs || cPosts !== pPosts) {
    //     return true;
    //   }
    //   return false;
    // }
  );

  const [flairs, setFlairs] = useState(getFlairs(context));
  const [activeFlairs, setActiveFlairs] = useState(flairs);

  useEffect(() => {
    setFlairs(getFlairs(context));
    setActiveFlairs(getFlairs(context));
  }, [context]);

  const VALUE: RedditContext = {
    service,
    flairs: {
      selected: activeFlairs,
      all: flairs,
    },
    actions: {
      selectSubreddit: (name: string) => service.send({ type: 'SELECT', payload: { name } }),
      setFlairs: (_flairs: string[]) => setActiveFlairs(_flairs),
    },
  };

  return <RedditContext.Provider value={VALUE}>{children}</RedditContext.Provider>;
};

export const useRedditContext = () => {
  const context = useContext(RedditContext);
  if (!context) {
    throw new Error('useRedditContext must be used within a RedditProvider');
  }
  return context;
};

export const useReddit = () => {
  const { service } = useContext(RedditContext);
  const actor = useActor(service);
  return actor;
};

// export const useSubreddit = (name: string) => {
//   const context = useContext(RedditContext);
//   const { subreddit, subreddits } = context.service.state.context;
//   if (subreddit && subreddit in subreddits) {
//     return subreddits[subreddit];
//   }
//   // TODO: Handle error
//   throw new Error(`Subreddit ${name} not found`);
// };
