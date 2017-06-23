import React from 'react';
import { View } from 'react-native';
import SingleInvitation from './SingleInvitation';

const Invitations = ({ invitations, acceptInvitation, rejectInvitation }) => (
  <View>
    {invitations.map(invitation => (
      <SingleInvitation
        key={invitation.uid}
        invitation={invitation}
        acceptInvitation={acceptInvitation}
        rejectInvitation={rejectInvitation}
      />
    ))}
  </View>
);

export default Invitations;
