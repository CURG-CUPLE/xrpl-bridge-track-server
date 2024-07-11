create table blockchain_network
(
    id           int unsigned auto_increment
        primary key,
    network      varchar(32)                         not null comment '블록체인 네트워크 이름, ex.Ethereum',
    block_number bigint unsigned                     not null comment '수집이 완료된 블록 번호',
    created_at   timestamp default CURRENT_TIMESTAMP not null comment '생성일시'
);

create table blockchain_bridge_token
(
    id               int unsigned auto_increment
        primary key,
    network_id       int unsigned                        not null comment 'blockchain_network id',
    symbol           varchar(32)                         not null comment '코인 심볼, ex.ETH',
    contract_address varchar(128)                        not null comment 'Bridge Contract Address',
    created_at       timestamp default CURRENT_TIMESTAMP not null comment '생성일시'
);

create table blockchain_bridge_transaction
(
    id           bigint auto_increment
        primary key,
    token_id     int unsigned                        not null comment 'blockchain_network id',
    txid         varchar(128)                        not null comment 'transaction hash',
    amount       decimal(65, 18)                     not null comment 'bridge amount',
    fee          decimal(65, 18)                     not null comment 'bridge transaction network fee',
    block_number bigint unsigned                     not null comment 'block number',
    `to`         varchar(128)                        not null comment 'bridge to address',
    block_time   timestamp                           not null comment 'block time',
    status       tinyint                             not null comment '트랜잭션 처리 상태(0:진행,1:성공,2:실패)',
    created_at   timestamp default CURRENT_TIMESTAMP not null comment '생성일시'
);