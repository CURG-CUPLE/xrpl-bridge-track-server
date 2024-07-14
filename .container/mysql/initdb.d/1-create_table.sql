create table blockchain_network
(
    id           int unsigned auto_increment
        primary key,
    network      varchar(32)                         not null comment '블록체인 네트워크 이름, ex.Ethereum',
    block_number bigint unsigned not null comment '수집이 완료된 블록 번호',
    created_at   timestamp default CURRENT_TIMESTAMP not null comment '생성일시',
    constraint uk_blockchain_network_network
        unique (network)
)   engine = InnoDB
    charset = utf8mb4
    comment '블록체인 브릿지 네트워크 정보';

create table blockchain_bridge_transaction
(
    id           bigint auto_increment
        primary key,
    network_id   int unsigned not null comment 'blockchain_network id',
    txid         varchar(128)                        not null comment 'transaction hash',
    amount       bigint unsigned not null comment 'bridge amount',
    fee          bigint unsigned not null comment 'bridge transaction network fee',
    block_number bigint unsigned not null comment 'block number',
    `to`         varchar(128)                        not null comment 'bridge to address',
    block_time   bigint unsigned not null comment 'block time',
    status       varchar(32)                         not null comment '트랜잭션 처리 상태',
    created_at   timestamp default CURRENT_TIMESTAMP not null comment '생성일시',
    constraint fk_blockchain_bridge_transaction_network_id
        foreign key (network_id) references blockchain_network (id)
)   engine = InnoDB
    charset = utf8mb4
    comment '브릿지 트랜잭션 정보';

