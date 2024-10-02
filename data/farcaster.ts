import { CHANNEL_ID, SIGNER_UUID } from "@/env";
import { makeNeynarRequest } from "@/lib/neynar";
import { ChannelMetadata, Cast, User, Member } from "@/types";

export type MembersResponse = {
  members: Member[];
};
export async function getChannelMembers(): Promise<MembersResponse> {
  const url = "https://api.neynar.com/v2/farcaster/channel/member/list";
  const response = await makeNeynarRequest({
    url,
    method: "GET",
    queryParams: { channel_id: CHANNEL_ID },
  });

  return response as MembersResponse;
}

export async function getChannelDetails(): Promise<ChannelMetadata> {
  const url = "https://api.neynar.com/v2/farcaster/channel";
  const response = await makeNeynarRequest({
    url,
    method: "GET",
    queryParams: { id: CHANNEL_ID },
  });

  return response.channel as ChannelMetadata;
}

export type UsersResponse = {
  users: User[];
};
export async function getUser(fid: number): Promise<UsersResponse> {
  const url = `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`;

  const response = await makeNeynarRequest({
    url,
    method: "GET",
  });

  return response as UsersResponse;
}

export async function sendChannelInvite(fid: number): Promise<boolean> {
  const url = "https://api.neynar.com/v2/farcaster/channel/member/invite";

  const data = {
    signer_uuid: SIGNER_UUID,
    channel_id: CHANNEL_ID,
    fid,
    role: "member",
  };

  return makeNeynarRequest({ url, method: "POST", data });
}

export async function getUserCasts(fid: number): Promise<Cast[]> {
  const url = `https://api.neynar.com/v2/farcaster/feed/user/casts`;
  const response = await makeNeynarRequest({
    url,
    method: "GET",
    queryParams: {
      fid: fid.toString(),
      channel_id: CHANNEL_ID,
    },
  });

  return response.casts as Cast[];
}
